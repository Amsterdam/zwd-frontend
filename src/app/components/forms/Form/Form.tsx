import React, { ReactNode } from "react"
import { useForm, UseFormReturn, FieldValues, DefaultValues  } from "react-hook-form"
import { Grid } from "@amsterdam/design-system-react"
import withExceptionCapturing from "app/utils/withExceptionCapturing"

type FormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>
  children: ReactNode
  onSubmit: (data: T) => void
}

export const Form = <T extends FieldValues>({ defaultValues, children, onSubmit }: FormProps<T>) => {
  const methods: UseFormReturn<T> = useForm<T>({ defaultValues })
  const { handleSubmit, register, formState } = methods

  return (
    <Grid paddingTop="small" paddingBottom="medium" style={{ paddingLeft: 0 }}>
      <Grid.Cell span={{ narrow: 4, medium: 6, wide: 6 }}>
        <form className="ams-gap--md" onSubmit={ withExceptionCapturing(handleSubmit(onSubmit)) }>
          {React.Children.map(children, (child, key) =>
            React.isValidElement(child) 
              ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  key,
                  register,
                  formState
                }
              })
              : child
          )}
        </form>
      </Grid.Cell>
    </Grid>
  )
}
