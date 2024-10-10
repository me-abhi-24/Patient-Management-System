"use client"
// import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldType } from "@/forms/PatientForm"
import Image from "next/image"
import { Control } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

type E164Number = string;  
const phoneNumber: E164Number = "+14155552671";

interface CustomProps {
    control: Control<any>,
    fieldTypee: FormFieldType
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string
    disabled?: boolean
    dateFormate?: string
    showTimeSelect?: boolean
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldTypee, iconSrc, iconAlt, placeholder } = props;
    switch (fieldTypee) {
        case FormFieldType.INPUT:


            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    )}

                    <FormControl>
                        <Input
                            {...field}
                            placeholder={placeholder}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput 
                    defaultCountry="US"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as E164Number |undefined}
                    onChange={field.onChange}
                    className="shad-input"
                    />
                </FormControl>
            )
        default:
            break;
    }
}
const CustomFormField = (props: CustomProps) => {
    const { control, fieldTypee, name, label } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldTypee !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />

                    <FormMessage className="shad-error" />

                </FormItem>
            )}
        />
    )
}

export default CustomFormField
