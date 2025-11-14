import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, loadUsers, createMaster, deleteUser } from "@/lib/users";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Mail, Key, UserPlus } from "lucide-react";

export const MastersManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(loadUsers());
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [masterId, setMasterId] = useState("");

  const handleCreateMaster = () => {
    if (!newEmail || !newPassword || !masterId) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const emailExists = users.some(u => u.email === newEmail);
    if (emailExists) {
      toast({
        title: "Ошибка",
        description: "Пользователь с таким email уже существует",
        variant: "destructive"
      });
      return;
    }

    createMaster(newEmail, newPassword, masterId);
    setUsers(loadUsers());
    setNewEmail("");
    setNewPassword("");
    setMasterId("");

    toast({
      title: "Успешно",
      description: `Мастер создан. Email: ${newEmail}, Пароль: ${newPassword}`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      deleteUser(userId);
      setUsers(loadUsers());
      toast({
        title: "Удалено",
        description: "Пользователь успешно удален",
      });
    }
  };

  const masters = users.filter(u => u.role === 'master');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Создать нового мастера
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              <Mail className="h-4 w-4 inline mr-1" />
              Email
            </label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="master@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              <Key className="h-4 w-4 inline mr-1" />
              Пароль
            </label>
            <Input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              ID Мастера
            </label>
            <Input
              type="text"
              value={masterId}
              onChange={(e) => setMasterId(e.target.value)}
              placeholder="1"
            />
          </div>

          <Button onClick={handleCreateMaster} className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Создать мастера
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список мастеров ({masters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {masters.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Мастера не найдены
              </p>
            ) : (
              masters.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      ID Мастера: {user.masterId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Создан: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
