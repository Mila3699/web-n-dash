import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadSiteContent, saveSiteContent, PageContent, ContentBlock } from "@/data/siteContent";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Save, Download, Upload } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/login');
    }
    setContent(loadSiteContent());
  }, [navigate]);

  const handleSave = () => {
    saveSiteContent(content);
    toast({
      title: "Сохранено",
      description: "Изменения успешно сохранены",
    });
  };

  const handleUpdateBlock = (pageId: string, blockId: string, updates: Partial<ContentBlock>) => {
    setContent(prev => prev.map(page => 
      page.pageId === pageId 
        ? {
            ...page,
            blocks: page.blocks.map(block => 
              block.id === blockId ? { ...block, ...updates } : block
            )
          }
        : page
    ));
  };

  const handleDeleteBlock = (pageId: string, blockId: string) => {
    setContent(prev => prev.map(page => 
      page.pageId === pageId 
        ? {
            ...page,
            blocks: page.blocks.filter(block => block.id !== blockId)
          }
        : page
    ));
    toast({
      title: "Удалено",
      description: "Блок успешно удален",
    });
  };

  const handleAddBlock = (pageId: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: 'text',
      title: 'Новый блок',
      content: 'Содержимое блока',
      order: content.find(p => p.pageId === pageId)?.blocks.length || 0
    };
    
    setContent(prev => prev.map(page => 
      page.pageId === pageId 
        ? { ...page, blocks: [...page.blocks, newBlock] }
        : page
    ));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-content.json';
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Экспортировано",
      description: "Контент сохранен в файл",
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setContent(imported);
          saveSiteContent(imported);
          toast({
            title: "Импортировано",
            description: "Контент успешно загружен",
          });
        } catch (error) {
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить файл",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const currentPage = content.find(p => p.pageId === selectedPage);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Редактор Контента
            </h1>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Сохранить
              </Button>
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Экспорт
              </Button>
              <label htmlFor="import-file">
                <Button variant="outline" className="gap-2" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                    Импорт
                  </span>
                </Button>
              </label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </div>

          <Tabs value={selectedPage} onValueChange={setSelectedPage} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 h-auto bg-muted p-1">
              {content.map(page => (
                <TabsTrigger 
                  key={page.pageId} 
                  value={page.pageId}
                  className="text-sm md:text-base"
                >
                  {page.pageName}
                </TabsTrigger>
              ))}
            </TabsList>

            {content.map(page => (
              <TabsContent key={page.pageId} value={page.pageId} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {page.pageName}
                  </h2>
                  <Button onClick={() => handleAddBlock(page.pageId)} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:inline">Добавить блок</span>
                  </Button>
                </div>

                <div className="grid gap-4">
                  {page.blocks.map(block => (
                    <Card key={block.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-base md:text-lg">
                            {block.type.toUpperCase()} блок
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingBlock(editingBlock?.id === block.id ? null : block)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteBlock(page.pageId, block.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {editingBlock?.id === block.id ? (
                          <div className="space-y-4">
                            {block.type !== 'image' && (
                              <div>
                                <label className="text-sm font-medium mb-2 block">Заголовок</label>
                                <Input
                                  value={block.title || ''}
                                  onChange={(e) => handleUpdateBlock(page.pageId, block.id, { title: e.target.value })}
                                  placeholder="Заголовок"
                                />
                              </div>
                            )}
                            {(block.type === 'hero' || block.type === 'text' || block.type === 'section') && (
                              <div>
                                <label className="text-sm font-medium mb-2 block">Текст</label>
                                <Textarea
                                  value={block.content || ''}
                                  onChange={(e) => handleUpdateBlock(page.pageId, block.id, { content: e.target.value })}
                                  placeholder="Текст"
                                  rows={4}
                                />
                              </div>
                            )}
                            {(block.type === 'hero' || block.type === 'image') && (
                              <div>
                                <label className="text-sm font-medium mb-2 block">URL изображения</label>
                                <Input
                                  value={block.imageUrl || ''}
                                  onChange={(e) => handleUpdateBlock(page.pageId, block.id, { imageUrl: e.target.value })}
                                  placeholder="URL изображения"
                                />
                              </div>
                            )}
                            {block.type === 'button' && (
                              <>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Текст кнопки</label>
                                  <Input
                                    value={block.buttonText || ''}
                                    onChange={(e) => handleUpdateBlock(page.pageId, block.id, { buttonText: e.target.value })}
                                    placeholder="Текст кнопки"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Ссылка</label>
                                  <Input
                                    value={block.buttonLink || ''}
                                    onChange={(e) => handleUpdateBlock(page.pageId, block.id, { buttonLink: e.target.value })}
                                    placeholder="/link"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2 text-sm">
                            {block.title && <p className="font-medium">{block.title}</p>}
                            {block.content && <p className="text-muted-foreground line-clamp-2">{block.content}</p>}
                            {block.buttonText && <p className="text-primary">Кнопка: {block.buttonText}</p>}
                            {block.imageUrl && <p className="text-muted-foreground text-xs truncate">Фото: {block.imageUrl}</p>}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
