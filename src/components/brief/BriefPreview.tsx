import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BriefData, campaignGoalsOptions, platformOptions } from './briefTypes';

interface BriefPreviewProps {
  open: boolean;
  onClose: () => void;
  briefData: BriefData;
  selectedBlogger?: { name: string; avatar: string } | null;
  onEdit: () => void;
  onSubmit: () => void;
}

export default function BriefPreview({
  open,
  onClose,
  briefData,
  selectedBlogger,
  onEdit,
  onSubmit
}: BriefPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Icon name="FileCheck" size={28} className="text-primary" />
            Предпросмотр технического задания
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Card className="border-2">
            <CardHeader className="gradient-purple text-white">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Building2" size={22} />
                О компании
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div><strong>Компания:</strong> {briefData.companyName}</div>
              {briefData.companyWebsite && <div><strong>Сайт:</strong> {briefData.companyWebsite}</div>}
              <div><strong>Контактное лицо:</strong> {briefData.contactPerson}</div>
              <div><strong>Email:</strong> {briefData.email}</div>
              {briefData.phone && <div><strong>Телефон:</strong> {briefData.phone}</div>}
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="bg-primary/10">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Package" size={22} />
                Продукт
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div><strong>Название:</strong> {briefData.productName}</div>
              {briefData.productCategory && <div><strong>Категория:</strong> {briefData.productCategory}</div>}
              <div><strong>Описание:</strong> {briefData.productDescription}</div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="bg-secondary/10">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={22} />
                Целевая аудитория
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div><strong>Описание:</strong> {briefData.targetAudience}</div>
              <div><strong>Возраст:</strong> {briefData.audienceAge}</div>
              {briefData.audienceGender && <div><strong>Пол:</strong> {briefData.audienceGender}</div>}
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="bg-accent/10">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" size={22} />
                Детали кампании
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <strong>Цели кампании:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {briefData.campaignGoals.map(goal => {
                    const goalOption = campaignGoalsOptions.find(g => g.value === goal);
                    return (
                      <Badge key={goal} variant="secondary" className="text-sm">
                        {goalOption?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              {briefData.preferredPlatforms.length > 0 && (
                <div>
                  <strong>Платформы:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {briefData.preferredPlatforms.map(platform => {
                      const platformOption = platformOptions.find(p => p.value === platform);
                      return (
                        <Badge key={platform} variant="outline" className="text-sm">
                          {platformOption?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              <div><strong>Бюджет:</strong> {briefData.budget}</div>
              {briefData.timeline && <div><strong>Сроки:</strong> {briefData.timeline}</div>}
              {briefData.additionalInfo && (
                <div><strong>Дополнительная информация:</strong> {briefData.additionalInfo}</div>
              )}
            </CardContent>
          </Card>

          {selectedBlogger && (
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedBlogger.avatar}</span>
                  <div>
                    <strong>Выбранный блогер:</strong>
                    <div className="text-lg">{selectedBlogger.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onEdit} className="flex-1">
            <Icon name="Edit" size={18} className="mr-2" />
            Редактировать
          </Button>
          <Button onClick={onSubmit} className="flex-1 gradient-purple border-0">
            <Icon name="Send" size={18} className="mr-2" />
            Отправить ТЗ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
