import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalculatorInput, MedicalCalculator } from '../../types/calculator';
import { cn } from '../../lib/utils';

interface CalculatorFormProps {
  calculator: MedicalCalculator;
  onCalculate: (result: any) => void;
  className?: string;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  calculator,
  onCalculate,
  className
}) => {
  // Create dynamic validation schema based on inputs
  const validationSchema = z.object(
    calculator.inputs.reduce((acc, input) => {
      if (input.type === 'number') {
        let schema = z.number();
        if (input.required) schema = schema.min(input.min || -Infinity);
        if (input.max) schema = schema.max(input.max);
        acc[input.id] = input.required ? schema : schema.optional();
      } else {
        acc[input.id] = input.required ? z.string() : z.string().optional();
      }
      return acc;
    }, {} as Record<string, z.ZodType>)
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = (data: any) => {
    // Convert string values to numbers where needed
    const processedData = Object.entries(data).reduce((acc, [key, value]) => {
      const input = calculator.inputs.find(i => i.id === key);
      if (input?.type === 'number') {
        acc[key] = Number(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    const result = calculator.calculate(processedData);
    onCalculate(result);
  };

  const renderInput = (input: CalculatorInput) => {
    switch (input.type) {
      case 'number':
        return (
          <input
            type="number"
            {...register(input.id)}
            min={input.min}
            max={input.max}
            step={input.step}
            placeholder={input.placeholder}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              "focus:ring-2 focus:ring-primary focus:border-transparent",
              errors[input.id] && "border-red-500"
            )}
          />
        );
      case 'select':
        return (
          <select
            {...register(input.id)}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              "focus:ring-2 focus:ring-primary focus:border-transparent",
              errors[input.id] && "border-red-500"
            )}
          >
            <option value="">Select...</option>
            {input.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {input.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register(input.id)}
                  value={option.value}
                  className="text-primary focus:ring-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            {...register(input.id)}
            className="text-primary focus:ring-primary rounded"
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
      {calculator.inputs.map((input, index) => (
        <div key={input.id} className="space-y-2">
          <label className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {index + 1}. {input.label}
              {input.required && <span className="text-red-500">*</span>}
            </span>
            {input.unit && (
              <span className="text-sm text-gray-500">({input.unit})</span>
            )}
          </label>
          {input.description && (
            <p className="text-sm text-gray-500">{input.description}</p>
          )}
          {renderInput(input)}
          {errors[input.id] && (
            <p className="text-sm text-red-500">
              {errors[input.id]?.message as string}
            </p>
          )}
        </div>
      ))}
      
      <button
        type="submit"
        className={cn(
          "w-full px-4 py-2 text-white rounded-md",
          "bg-primary hover:bg-primary/90 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        )}
      >
        Calculate
      </button>
    </form>
  );
};