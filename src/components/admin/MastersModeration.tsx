import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPendingMasters, approveMaster, rejectMaster, Master } from "@/data/mockMasters";
import { useToast } from "@/hooks/use-toast";
import { Check, X, User, MapPin, Tag } from "lucide-react";

export const MastersModeration = () => {
  const { toast } = useToast();
  const [pendingMasters, setPendingMasters] = useState<Master[]>([]);

  const loadPendingMasters = () => {
    setPendingMasters(getPendingMasters());
  };

  useEffect(() => {
    loadPendingMasters();
  }, []);

  const handleApprove = (masterId: number) => {
    approveMaster(masterId);
    loadPendingMasters();
    toast({
      title: "Одобрено",
      description: "Карточка мастера опубликована",
    });
  };

  const handleReject = (masterId: number) => {
    if (confirm("Вы уверены, что хотите отклонить эту карточку?")) {
      rejectMaster(masterId);
      loadPendingMasters();
      toast({
        title: "Отклонено",
        description: "Карточка мастера отклонена",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Карточки на модерации</span>
            <Badge variant="secondary">{pendingMasters.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingMasters.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Нет карточек на модерации
            </p>
          ) : (
            <div className="grid gap-6">
              {pendingMasters.map((master) => (
                <Card key={master.id} className="border-2 border-orange-200">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Photo */}
                      <div className="flex-shrink-0">
                        {master.photo ? (
                          <img
                            src={master.photo}
                            alt={master.name}
                            className="w-32 h-32 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center">
                            <User className="w-16 h-16 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {master.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4" />
                            {master.cities.join(", ")}
                          </div>
                        </div>

                        <p className="text-foreground">{master.description}</p>

                        {master.tags && master.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            {master.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {master.socials && master.socials.length > 0 && (
                          <div className="text-sm text-muted-foreground">
                            Соцсети: {master.socials.join(", ")}
                          </div>
                        )}

                        {master.telegram && (
                          <div className="text-sm text-muted-foreground">
                            Telegram: {master.telegram}
                          </div>
                        )}

                        {master.pulse && (
                          <div className="text-sm">
                            <strong>Пульс:</strong> {master.pulse.sessionsMonth} сессий/месяц
                            {master.pulse.reviews && master.pulse.reviews.length > 0 && (
                              <div className="mt-1">
                                Отзывы: {master.pulse.reviews.join(", ")}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:w-32">
                        <Button
                          onClick={() => handleApprove(master.id)}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Одобрить
                        </Button>
                        <Button
                          onClick={() => handleReject(master.id)}
                          variant="destructive"
                          className="w-full"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Отклонить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
