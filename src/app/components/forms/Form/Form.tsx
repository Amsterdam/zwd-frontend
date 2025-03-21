import React, { ReactNode, useCallback } from "react"
import {
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues
} from "react-hook-form"
import { Button, Grid, GridColumnNumbers } from "@amsterdam/design-system-react"
import withExceptionCapturing from "app/utils/withExceptionCapturing"

type FormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>
  children: ReactNode
  onSubmit: (data: T) => void
  formGrid?: GridColumnNumbers
  hasDummyButton?: boolean
  dummyValues?: DefaultValues<T>
}

const DEFAULT_GRID: GridColumnNumbers = { narrow: 4, medium: 6, wide: 10 }

export const Form = <T extends FieldValues>({
  defaultValues,
  children,
  onSubmit,
  formGrid = DEFAULT_GRID,
  hasDummyButton,
  dummyValues
}: FormProps<T>) => {
  const formMethods: UseFormReturn<T> = useForm<T>({ defaultValues })
  const { handleSubmit, reset } = formMethods

  const handleReset = useCallback(() => {
    if (hasDummyButton && dummyValues) {
      reset(dummyValues)
    }
  }, [reset, dummyValues, hasDummyButton])

  return (
    <>
      <Grid
        paddingTop="small"
        paddingBottom="medium"
        style={{ paddingLeft: 0 }}
      >
        <Grid.Cell span={formGrid}>
          <form
            className="ams-gap--md"
            onSubmit={withExceptionCapturing(handleSubmit(onSubmit))}
          >
            {React.Children.map(children, (child, key) => {
              if (React.isValidElement(child)) {
                const childProps = child.props as { name?: string } 
                // Add formMethods to all fields with the "name" prop
                if (childProps.name) {
                  return React.createElement(child.type, {
                    ...child.props,
                    key,
                    formMethods
                  })
                }
              }
              return child
            })}
          </form>
        </Grid.Cell>
      </Grid>
      {hasDummyButton && (
        <Button variant="primary" onClick={handleReset}>
          Voer dummy waarden in
        </Button>
      )}
    </>
  )
}
