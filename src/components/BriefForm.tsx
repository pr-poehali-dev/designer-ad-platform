import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface BriefData {
  companyName: string;
  companyWebsite: string;
  contactPerson: string;
  email: string;
  phone: string;
  productName: string;
  productDescription: string;
  productCategory: string;
  targetAudience: string;
  audienceAge: string;
  audienceGender: string;
  campaignGoals: string[];
  budget: string;
  timeline: string;
  preferredPlatforms: string[];
  additionalInfo: string;
}

const initialBriefData: BriefData = {
  companyName: '',
  companyWebsite: '',
  contactPerson: '',
  email: '',
  phone: '',
  productName: '',
  productDescription: '',
  productCategory: '',
  targetAudience: '',
  audienceAge: '',
  audienceGender: '',
  campaignGoals: [],
  budget: '',
  timeline: '',
  preferredPlatforms: [],
  additionalInfo: ''
};

const steps = [
  { id: 1, title: 'О компании', icon: 'Building2' },
  { id: 2, title: 'Продукт', icon: 'Package' },
  { id: 3, title: 'Аудитория', icon: 'Users' },
  { id: 4, title: 'Кампания', icon: 'Target' }
];

const campaignGoalsOptions = [
  { value: 'awareness', label: 'Узнаваемость бренда', icon: 'Eye' },
  { value: 'sales', label: 'Рост продаж', icon: 'TrendingUp' },
  { value: 'traffic', label: 'Трафик на сайт', icon: 'MousePointer' },
  { value: 'engagement', label: 'Вовлечённость', icon: 'Heart' },
  { value: 'leads', label: 'Генерация лидов', icon: 'UserPlus' }
];

const platformOptions = [
  { value: 'instagram', label: 'Instagram', icon: 'Instagram' },
  { value: 'youtube', label: 'YouTube', icon: 'Youtube' },
  { value: 'tiktok', label: 'TikTok', icon: 'Music' },
  { value: 'telegram', label: 'Telegram', icon: 'Send' },
  { value: 'vk', label: 'VK', icon: 'MessageCircle' }
];

interface BriefFormProps {
  open: boolean;
  onClose: () => void;
  selectedBlogger?: { name: string; avatar: string } | null;
}

export default function BriefForm({ open, onClose, selectedBlogger }: BriefFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [briefData, setBriefData] = useState<BriefData>(initialBriefData);
  const [showPreview, setShowPreview] = useState(false);

  const progress = (currentStep / steps.length) * 100;

  const updateField = (field: keyof BriefData, value: any) => {
    setBriefData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: 'campaignGoals' | 'preferredPlatforms', value: string) => {
    setBriefData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return briefData.companyName && briefData.contactPerson && briefData.email;
      case 2:
        return briefData.productName && briefData.productDescription;
      case 3:
        return briefData.targetAudience && briefData.audienceAge;
      case 4:
        return briefData.campaignGoals.length > 0 && briefData.budget;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowPreview(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting brief:', briefData);
    alert('Техническое задание успешно отправлено! Мы свяжемся с вами в ближайшее время.');
    onClose();
    setBriefData(initialBriefData);
    setCurrentStep(1);
    setShowPreview(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="companyName">Название компании *</Label>
              <Input
                id="companyName"
                placeholder="ООО «Ваша компания»"
                value={briefData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="companyWebsite">Сайт компании</Label>
              <Input
                id="companyWebsite"
                placeholder="https://yourcompany.ru"
                value={briefData.companyWebsite}
                onChange={(e) => updateField('companyWebsite', e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="contactPerson">Контактное лицо *</Label>
              <Input
                id="contactPerson"
                placeholder="Иван Иванов"
                value={briefData.contactPerson}
                onChange={(e) => updateField('contactPerson', e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@company.ru"
                  value={briefData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={briefData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="productName">Название продукта/услуги *</Label>
              <Input
                id="productName"
                placeholder="Ваш продукт"
                value={briefData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="productCategory">Категория</Label>
              <Input
                id="productCategory"
                placeholder="Например: Косметика, IT, Еда"
                value={briefData.productCategory}
                onChange={(e) => updateField('productCategory', e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="productDescription">Описание продукта *</Label>
              <Textarea
                id="productDescription"
                placeholder="Опишите ваш продукт или услугу. Что делает его уникальным?"
                value={briefData.productDescription}
                onChange={(e) => updateField('productDescription', e.target.value)}
                className="mt-1.5 min-h-[120px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="targetAudience">Целевая аудитория *</Label>
              <Textarea
                id="targetAudience"
                placeholder="Кто ваши клиенты? Их интересы, поведение, боли"
                value={briefData.targetAudience}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                className="mt-1.5 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="audienceAge">Возраст *</Label>
                <Input
                  id="audienceAge"
                  placeholder="18-35 лет"
                  value={briefData.audienceAge}
                  onChange={(e) => updateField('audienceAge', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="audienceGender">Пол</Label>
                <Input
                  id="audienceGender"
                  placeholder="М/Ж/Любой"
                  value={briefData.audienceGender}
                  onChange={(e) => updateField('audienceGender', e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5 animate-fade-in">
            <div>
              <Label className="mb-3 block">Цели кампании *</Label>
              <div className="grid grid-cols-2 gap-2">
                {campaignGoalsOptions.map(goal => (
                  <Button
                    key={goal.value}
                    type="button"
                    variant={briefData.campaignGoals.includes(goal.value) ? 'default' : 'outline'}
                    className={`w-full justify-start ${
                      briefData.campaignGoals.includes(goal.value) ? 'gradient-purple border-0' : ''
                    }`}
                    onClick={() => toggleArrayValue('campaignGoals', goal.value)}
                  >
                    <Icon name={goal.icon as any} size={16} className="mr-2" />
                    {goal.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Предпочтительные платформы</Label>
              <div className="grid grid-cols-3 gap-2">
                {platformOptions.map(platform => (
                  <Button
                    key={platform.value}
                    type="button"
                    variant={briefData.preferredPlatforms.includes(platform.value) ? 'default' : 'outline'}
                    className={`w-full ${
                      briefData.preferredPlatforms.includes(platform.value) ? 'gradient-purple border-0' : ''
                    }`}
                    onClick={() => toggleArrayValue('preferredPlatforms', platform.value)}
                  >
                    <Icon name={platform.icon as any} size={16} className="mr-2" />
                    {platform.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Бюджет *</Label>
                <Input
                  id="budget"
                  placeholder="от 100 000 ₽"
                  value={briefData.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="timeline">Сроки</Label>
                <Input
                  id="timeline"
                  placeholder="1-2 месяца"
                  value={briefData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="additionalInfo">Дополнительная информация</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Есть ли особые требования или пожелания?"
                value={briefData.additionalInfo}
                onChange={(e) => updateField('additionalInfo', e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open && !showPreview} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Icon name="FileText" size={28} className="text-primary" />
              Техническое задание
            </DialogTitle>
            <DialogDescription>
              {selectedBlogger && (
                <div className="flex items-center gap-2 mt-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-2xl">{selectedBlogger.avatar}</span>
                  <span className="font-semibold text-foreground">Выбран блогер: {selectedBlogger.name}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                        currentStep >= step.id
                          ? 'gradient-purple border-transparent text-white'
                          : 'border-muted-foreground/30 text-muted-foreground'
                      }`}
                    >
                      <Icon name={step.icon as any} size={18} />
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 transition-all ${
                          currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground/20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-center mt-2 text-sm text-muted-foreground">
                Шаг {currentStep} из {steps.length}: {steps[currentStep - 1].title}
              </div>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name={steps[currentStep - 1].icon as any} size={22} />
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && 'Расскажите о вашей компании'}
                  {currentStep === 2 && 'Опишите продукт или услугу'}
                  {currentStep === 3 && 'Кто ваша целевая аудитория?'}
                  {currentStep === 4 && 'Детали рекламной кампании'}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <Icon name="ChevronLeft" size={18} className="mr-1" />
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={!validateStep()}
                className="gradient-purple border-0"
              >
                {currentStep === steps.length ? 'Просмотреть ТЗ' : 'Далее'}
                <Icon name="ChevronRight" size={18} className="ml-1" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={() => setShowPreview(false)}>
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
            <Button variant="outline" onClick={() => setShowPreview(false)} className="flex-1">
              <Icon name="Edit" size={18} className="mr-2" />
              Редактировать
            </Button>
            <Button onClick={handleSubmit} className="flex-1 gradient-purple border-0">
              <Icon name="Send" size={18} className="mr-2" />
              Отправить ТЗ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
