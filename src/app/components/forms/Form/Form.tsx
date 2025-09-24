import React, { ReactNode, useCallback, useEffect } from "react"
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

const DEFAULT_GRID: GridColumnNumbers = { narrow: 4, medium: 8, wide: 12 }

type ChildProps = {
  name?: string
  [key: string]: Value
}

export const Form = <T extends FieldValues>({
  defaultValues,
  children,
  onSubmit,
  formGrid = DEFAULT_GRID,
  hasDummyButton,
  dummyValues
}: FormProps<T>) => {
  const formMethods: UseFormReturn<T> = useForm<T>({
    defaultValues,
    mode: "onChange"
  })
  const { handleSubmit, reset } = formMethods

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues) // Reset the form with default values when they change
    }
  }, [defaultValues, reset])

  const handleReset = useCallback(() => {
    if (hasDummyButton && dummyValues) {
      reset(dummyValues)
    }
  }, [reset, dummyValues, hasDummyButton])

  return (
    <>
      <Grid
        paddingTop="large"
        paddingBottom="x-large"
        style={{ paddingLeft: 0 }}
      >
        <Grid.Cell span={formGrid}>
          <form
            className="ams-gap-m"
            onSubmit={withExceptionCapturing(handleSubmit(onSubmit))}
          >
            {React.Children.map(children, (child, key) => {
              if (React.isValidElement<ChildProps>(child)) {
                // Add formMethods to all fields with the "name" prop
                if (child.props.name) {
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
