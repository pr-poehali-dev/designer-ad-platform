import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { BriefData, campaignGoalsOptions, platformOptions } from './briefTypes';

interface BriefStepContentProps {
  currentStep: number;
  briefData: BriefData;
  updateField: (field: keyof BriefData, value: any) => void;
  toggleArrayValue: (field: 'campaignGoals' | 'preferredPlatforms', value: string) => void;
}

export default function BriefStepContent({
  currentStep,
  briefData,
  updateField,
  toggleArrayValue
}: BriefStepContentProps) {
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
}
