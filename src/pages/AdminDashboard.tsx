import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadSiteContent, saveSiteContent, PageContent, ContentBlock } from "@/data/siteContent";
import { useToast } from "@/hooks/use-toast";
import { Save, Download, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableBlockItem } from "@/components/admin/SortableBlockItem";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    if (editingBlock?.id === blockId) {
      setEditingBlock(null);
    }
    toast({
      title: "Удалено",
      description: "Блок успешно удален",
    });
  };

  const handleAddBlock = (pageId: string, blockType: ContentBlock['type'] = 'text') => {
    const currentPage = content.find(p => p.pageId === pageId);
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      title: blockType === 'gallery' ? 'Новая галерея' : 'Новый блок',
      content: blockType === 'text' || blockType === 'section' ? 'Содержимое блока' : undefined,
      images: blockType === 'gallery' ? [] : undefined,
      order: currentPage?.blocks.length || 0
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

  const handleDragEnd = (event: DragEndEvent, pageId: string) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setContent(prev => prev.map(page => {
        if (page.pageId === pageId) {
          const blocks = [...page.blocks];
          const oldIndex = blocks.findIndex(b => b.id === active.id);
          const newIndex = blocks.findIndex(b => b.id === over.id);
          
          const reorderedBlocks = arrayMove(blocks, oldIndex, newIndex);
          
          // Update order values
          const updatedBlocks = reorderedBlocks.map((block, index) => ({
            ...block,
            order: index
          }));
          
          return { ...page, blocks: updatedBlocks };
        }
        return page;
      }));

      toast({
        title: "Порядок изменен",
        description: "Не забудьте сохранить изменения",
      });
    }
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

            {content.map(page => {
              const sortedBlocks = [...page.blocks].sort((a, b) => a.order - b.order);
              
              return (
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

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => handleDragEnd(event, page.pageId)}
                  >
                    <SortableContext
                      items={sortedBlocks.map(b => b.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid gap-4">
                        {sortedBlocks.map(block => (
                          <SortableBlockItem
                            key={block.id}
                            block={block}
                            pageId={page.pageId}
                            isEditing={editingBlock?.id === block.id}
                            onEdit={() => setEditingBlock(editingBlock?.id === block.id ? null : block)}
                            onDelete={() => handleDeleteBlock(page.pageId, block.id)}
                            onUpdate={(updates) => handleUpdateBlock(page.pageId, block.id, updates)}
                            onAddImage={() => handleAddImageToGallery(page.pageId, block.id)}
                            onRemoveImage={(index) => handleRemoveImageFromGallery(page.pageId, block.id, index)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>

                  {sortedBlocks.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <p className="text-lg mb-4">Блоков пока нет</p>
                      <p className="text-sm">Добавьте первый блок, используя меню выше</p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
