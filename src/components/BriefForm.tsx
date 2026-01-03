import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BriefData, initialBriefData, steps } from './brief/briefTypes';
import BriefStepContent from './brief/BriefStepContent';
import BriefPreview from './brief/BriefPreview';

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
              <CardContent>
                <BriefStepContent
                  currentStep={currentStep}
                  briefData={briefData}
                  updateField={updateField}
                  toggleArrayValue={toggleArrayValue}
                />
              </CardContent>
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

      <BriefPreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
        briefData={briefData}
        selectedBlogger={selectedBlogger}
        onEdit={() => setShowPreview(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
