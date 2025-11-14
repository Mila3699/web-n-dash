import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentBlock } from "@/data/siteContent";
import { Pencil, Trash2, GripVertical, Plus, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface SortableBlockItemProps {
  block: ContentBlock;
  pageId: string;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export const SortableBlockItem = ({
  block,
  pageId,
  isEditing,
  onEdit,
  onDelete,
  onUpdate,
  onAddImage,
  onRemoveImage,
}: SortableBlockItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getBlockIcon = (type: ContentBlock['type']) => {
    switch(type) {
      case 'hero': return '🎯';
      case 'text': return '📝';
      case 'image': return '🖼️';
      case 'button': return '🔘';
      case 'section': return '📑';
      case 'gallery': return '🎨';
      default: return '📄';
    }
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style}
      className="shadow-sm hover:shadow-md transition-shadow border-border/50"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div 
              {...attributes} 
              {...listeners}
              className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-xl">{getBlockIcon(block.type)}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base truncate">{block.title || 'Без названия'}</h3>
              <p className="text-xs text-muted-foreground">{block.type}</p>
            </div>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button
              size="sm"
              variant={isEditing ? "default" : "ghost"}
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isEditing ? (
          <div className="space-y-4">
            {block.type !== 'image' && block.type !== 'button' && (
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <span className="text-lg">📌</span> Заголовок
                </label>
                <Input
                  value={block.title || ''}
                  onChange={(e) => onUpdate({ title: e.target.value })}
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
                  onChange={(e) => onUpdate({ content: e.target.value })}
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
                    onChange={(e) => onUpdate({ imageUrl: e.target.value })}
                    placeholder="/путь/к/изображению.jpg или https://..."
                  />
                  {block.imageUrl && (
                    <div className="relative w-full h-40 rounded-md overflow-hidden border">
                      <img 
                        src={block.imageUrl} 
                        alt="Предпросмотр" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Ошибка+загрузки';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {block.type === 'button' && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-lg">🔘</span> Текст кнопки
                  </label>
                  <Input
                    value={block.buttonText || ''}
                    onChange={(e) => onUpdate({ buttonText: e.target.value })}
                    placeholder="Введите текст кнопки"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> Ссылка
                  </label>
                  <Input
                    value={block.buttonLink || ''}
                    onChange={(e) => onUpdate({ buttonLink: e.target.value })}
                    placeholder="/page или https://..."
                  />
                </div>
              </>
            )}
            
            {block.type === 'gallery' && (
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <span className="text-lg">🎨</span> Галерея изображений
                </label>
                <div className="space-y-2">
                  {block.images && block.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {block.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img 
                            src={img} 
                            alt={`Изображение ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Ошибка';
                            }}
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => onRemoveImage(idx)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Галерея пуста</p>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onAddImage}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить изображение
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground space-y-1">
            {block.content && (
              <p className="line-clamp-2">{block.content}</p>
            )}
            {block.buttonText && (
              <p>Кнопка: {block.buttonText}</p>
            )}
            {block.images && block.images.length > 0 && (
              <p>Изображений: {block.images.length}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
