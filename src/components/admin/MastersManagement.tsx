import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, loadUsers, createMaster, deleteUser } from "@/lib/users";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Mail, Key, UserPlus, RefreshCw, Copy, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const MastersManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(loadUsers());
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [masterId, setMasterId] = useState("");
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [lastCreatedCredentials, setLastCreatedCredentials] = useState<{email: string, password: string} | null>(null);

  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
    return password;
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(newPassword);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
    toast({
      title: "Скопировано",
      description: "Пароль скопирован в буфер обмена",
    });
  };

  const copyCredentials = async (email: string, password: string) => {
    const text = `Данные для входа:\nEmail: ${email}\nПароль: ${password}`;
    await navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано",
      description: "Данные для входа скопированы",
    });
  };

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
    setLastCreatedCredentials({ email: newEmail, password: newPassword });
    setUsers(loadUsers());
    
    toast({
      title: "Мастер создан",
      description: "Скопируйте данные для входа и отправьте их мастеру на email",
      duration: 5000,
    });

    setNewEmail("");
    setMasterId("");
    generatePassword();
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
          <CardDescription>
            Пароль генерируется автоматически. После создания мастера скопируйте данные и отправьте их на email мастера.
          </CardDescription>
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
              Пароль (сгенерирован автоматически)
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newPassword}
                readOnly
                className="bg-muted font-mono"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyPassword}
                title="Скопировать пароль"
              >
                {copiedPassword ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={generatePassword}
                title="Сгенерировать новый пароль"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
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
            <p className="text-xs text-muted-foreground mt-1">
              Укажите ID профиля мастера (например: 1, 2, 3...)
            </p>
          </div>

          <Button onClick={handleCreateMaster} className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Создать мастера
          </Button>
        </CardContent>
      </Card>

      {lastCreatedCredentials && (
        <Alert className="border-green-600 bg-green-50 dark:bg-green-950">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Мастер успешно создан! Отправьте эти данные на почту:</p>
              <div className="bg-background p-3 rounded border">
                <p className="text-sm"><strong>Email:</strong> {lastCreatedCredentials.email}</p>
                <p className="text-sm font-mono"><strong>Пароль:</strong> {lastCreatedCredentials.password}</p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => copyCredentials(lastCreatedCredentials.email, lastCreatedCredentials.password)}
              >
                <Copy className="h-3 w-3 mr-1" />
                Скопировать данные
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Список мастеров ({masters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {masters.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Мастеров пока нет
              </p>
            ) : (
              masters.map((master) => (
                <div
                  key={master.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{master.email}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ID мастера: {master.masterId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Создан: {new Date(master.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(master.id)}
                    className="text-destructive hover:text-destructive"
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
