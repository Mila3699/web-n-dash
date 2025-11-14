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
import { Pencil, Trash2, Plus, Save, Download, Upload, Image as ImageIcon, X, Link as LinkIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const handleAddBlock = (pageId: string, blockType: ContentBlock['type'] = 'text') => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      title: blockType === 'gallery' ? 'Новая галерея' : 'Новый блок',
      content: blockType === 'text' || blockType === 'section' ? 'Содержимое блока' : undefined,
      images: blockType === 'gallery' ? [] : undefined,
      order: content.find(p => p.pageId === pageId)?.blocks.length || 0
    };
    
    setContent(prev => prev.map(page => 
      page.pageId === pageId 
        ? { ...page, blocks: [...page.blocks, newBlock] }
        : page
    ));
    setEditingBlock(newBlock);
  };

  const handleAddImageToGallery = (pageId: string, blockId: string) => {
    const imageUrl = prompt('Введите URL изображения:');
    if (imageUrl) {
      setContent(prev => prev.map(page => 
        page.pageId === pageId 
          ? {
              ...page,
              blocks: page.blocks.map(block => 
                block.id === blockId && block.images
                  ? { ...block, images: [...block.images, imageUrl] }
                  : block
              )
            }
          : page
      ));
    }
  };

  const handleRemoveImageFromGallery = (pageId: string, blockId: string, imageIndex: number) => {
    setContent(prev => prev.map(page => 
      page.pageId === pageId 
        ? {
            ...page,
            blocks: page.blocks.map(block => 
              block.id === blockId && block.images
                ? { ...block, images: block.images.filter((_, idx) => idx !== imageIndex) }
                : block
            )
          }
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {page.pageName}
                  </h2>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Select onValueChange={(type) => handleAddBlock(page.pageId, type as ContentBlock['type'])}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Добавить блок" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hero">🎯 Герой-секция</SelectItem>
                        <SelectItem value="text">📝 Текстовый блок</SelectItem>
                        <SelectItem value="image">🖼️ Изображение</SelectItem>
                        <SelectItem value="button">🔘 Кнопка</SelectItem>
                        <SelectItem value="section">📄 Секция</SelectItem>
                        <SelectItem value="gallery">🖼️ Галерея</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4">
                  {page.blocks.map(block => (
                    <Card key={block.id} className="overflow-hidden">
                      <CardHeader className="pb-3 bg-muted/30">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base md:text-lg">
                              {block.type === 'hero' && '🎯'}
                              {block.type === 'text' && '📝'}
                              {block.type === 'image' && '🖼️'}
                              {block.type === 'button' && '🔘'}
                              {block.type === 'section' && '📄'}
                              {block.type === 'gallery' && '🖼️'}
                              {' '}
                              {block.title || `${block.type.charAt(0).toUpperCase() + block.type.slice(1)} блок`}
                            </CardTitle>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={editingBlock?.id === block.id ? "default" : "ghost"}
                              onClick={() => setEditingBlock(editingBlock?.id === block.id ? null : block)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteBlock(page.pageId, block.id)}
                              className="hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {editingBlock?.id === block.id ? (
                          <div className="space-y-4">
                            {block.type !== 'image' && block.type !== 'button' && (
                              <div>
                                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                  <span className="text-lg">📌</span> Заголовок
                                </label>
                                <Input
                                  value={block.title || ''}
                                  onChange={(e) => handleUpdateBlock(page.pageId, block.id, { title: e.target.value })}
                                  placeholder="Введите заголовок"
                                  className="font-medium"
                                />
                              </div>
                            )}
                            
                            {(block.type === 'hero' || block.type === 'text' || block.type === 'section') && (
                              <div>
                                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                  <span className="text-lg">✍️</span> Текст
                                </label>
                                <Textarea
                                  value={block.content || ''}
                                  onChange={(e) => handleUpdateBlock(page.pageId, block.id, { content: e.target.value })}
                                  placeholder="Введите текст"
                                  rows={6}
                                  className="resize-none"
                                />
                              </div>
                            )}
                            
                            {(block.type === 'hero' || block.type === 'image') && (
                              <div>
                                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                  <ImageIcon className="h-4 w-4" /> Изображение
                                </label>
                                <div className="space-y-2">
                                  <Input
                                    value={block.imageUrl || ''}
                                    onChange={(e) => handleUpdateBlock(page.pageId, block.id, { imageUrl: e.target.value })}
                                    placeholder="/путь/к/изображению.jpg или https://..."
                                  />
                                  {block.imageUrl && (
                                    <div className="relative w-full h-40 rounded-md overflow-hidden border">
                                      <img 
                                        src={block.imageUrl} 
                                        alt="Предпросмотр" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Не загрузилось</text></svg>';
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {block.type === 'button' && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <span className="text-lg">🔘</span> Текст кнопки
                                  </label>
                                  <Input
                                    value={block.buttonText || ''}
                                    onChange={(e) => handleUpdateBlock(page.pageId, block.id, { buttonText: e.target.value })}
                                    placeholder="Например: Пройти тест"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" /> Ссылка
                                  </label>
                                  <Input
                                    value={block.buttonLink || ''}
                                    onChange={(e) => handleUpdateBlock(page.pageId, block.id, { buttonLink: e.target.value })}
                                    placeholder="/test или https://example.com"
                                  />
                                </div>
                              </div>
                            )}

                            {block.type === 'gallery' && (
                              <div>
                                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                  <ImageIcon className="h-4 w-4" /> Галерея изображений
                                </label>
                                <div className="space-y-3">
                                  <Button 
                                    onClick={() => handleAddImageToGallery(page.pageId, block.id)}
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Добавить изображение
                                  </Button>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {block.images?.map((img, idx) => (
                                      <div key={idx} className="relative group">
                                        <img 
                                          src={img} 
                                          alt={`Изображение ${idx + 1}`}
                                          className="w-full h-32 object-cover rounded-md border"
                                          onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Ошибка</text></svg>';
                                          }}
                                        />
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={() => handleRemoveImageFromGallery(page.pageId, block.id, idx)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {block.title && (
                              <div className="flex items-start gap-2">
                                <span className="text-muted-foreground text-sm">📌</span>
                                <p className="font-semibold text-base">{block.title}</p>
                              </div>
                            )}
                            {block.content && (
                              <div className="flex items-start gap-2">
                                <span className="text-muted-foreground text-sm">✍️</span>
                                <p className="text-muted-foreground text-sm line-clamp-3">{block.content}</p>
                              </div>
                            )}
                            {block.buttonText && (
                              <div className="flex items-center gap-2 text-sm">
                                <span>🔘</span>
                                <span className="font-medium">{block.buttonText}</span>
                                {block.buttonLink && (
                                  <>
                                    <span className="text-muted-foreground">→</span>
                                    <span className="text-primary">{block.buttonLink}</span>
                                  </>
                                )}
                              </div>
                            )}
                            {block.imageUrl && (
                              <div className="flex items-start gap-2">
                                <ImageIcon className="h-4 w-4 text-muted-foreground mt-1" />
                                <div className="flex-1">
                                  <img 
                                    src={block.imageUrl} 
                                    alt="Предпросмотр" 
                                    className="w-full max-h-40 object-cover rounded-md border"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                            {block.images && block.images.length > 0 && (
                              <div className="flex items-start gap-2">
                                <ImageIcon className="h-4 w-4 text-muted-foreground mt-1" />
                                <div className="flex-1">
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {block.images.length} {block.images.length === 1 ? 'изображение' : 'изображений'}
                                  </p>
                                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                    {block.images.slice(0, 8).map((img, idx) => (
                                      <img 
                                        key={idx}
                                        src={img} 
                                        alt={`Фото ${idx + 1}`}
                                        className="w-full h-20 object-cover rounded border"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
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
