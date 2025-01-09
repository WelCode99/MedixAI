import React from 'react';
import { Heart, Activity, Wind, Zap, Moon, Pill, Shield, Droplet, Tablets, FirstAid } from 'lucide-react';
import { DrugCategory } from '../../types/drugs';
import { cn } from '../../lib/utils';

interface DrugCategoryCardProps {
  category: DrugCategory;
  title: string;
  count: number;
  onClick: () => void;
}

const categoryIcons = {
  vasopressors: Heart,
  inotropes: Activity,
  vasodilators: Wind,
  antiarrhythmics: Zap,
  sedatives: Moon,
  analgesics: Pill,
  neuromuscular_blockers: Shield,
  anticoagulants: Droplet,
  antibiotics: Tablets,
  antidotes: FirstAid
};

const DrugCategoryCard: React.FC<DrugCategoryCardProps> = ({
  category,
  title,
  count,
  onClick
}) => {
  const Icon = categoryIcons[category as keyof typeof categoryIcons];

  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border-2 transition-all duration-200",
        "hover:shadow-md hover:-translate-y-1",
        "flex flex-col items-center space-y-2",
        category === 'vasopressors' && "border-red-200 hover:border-red-400",
        category === 'inotropes' && "border-blue-200 hover:border-blue-400",
        category === 'sedatives' && "border-purple-200 hover:border-purple-400"
      )}
    >
      <div className={cn(
        "p-3 rounded-full",
        category === 'vasopressors' && "bg-red-100",
        category === 'inotropes' && "bg-blue-100",
        category === 'sedatives' && "bg-purple-100"
      )}>
        <Icon className={cn(
          "w-6 h-6",
          category === 'vasopressors' && "text-red-600",
          category === 'inotropes' && "text-blue-600",
          category === 'sedatives' && "text-purple-600"
        )} />
      </div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <span className="text-sm text-gray-500">{count} drogas</span>
    </button>
  );
};

interface DrugCategoriesProps {
  categories: Array<{
    category: DrugCategory;
    title: string;
    count: number;
  }>;
  onCategorySelect: (category: DrugCategory) => void;
}

export const DrugCategories: React.FC<DrugCategoriesProps> = ({
  categories,
  onCategorySelect
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(({ category, title, count }) => (
        <DrugCategoryCard
          key={category}
          category={category}
          title={title}
          count={count}
          onClick={() => onCategorySelect(category)}
        />
      ))}
    </div>
  );
};