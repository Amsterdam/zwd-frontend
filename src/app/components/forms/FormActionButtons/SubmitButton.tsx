import { Button } from "@amsterdam/design-system-react"
import { FieldValues, FormState } from "react-hook-form"
import { Spinner } from "app/components"


type Props = {
  label: string
  loading?: boolean
  isValid?: boolean 
  formState?: FormState<FieldValues>
  onSubmit? : () => void
}
  
export const SubmitButton: React.FC<Props> = ({ label, loading = false, formState, onSubmit }) => {
  const isValid = formState?.isValid ?? false

  return (
    <div>
      <Button type="submit" disabled={ !isValid || loading } onSubmit={ onSubmit }>
        { label }
        <Spinner loading={ loading } size={ 24 } color="#FFFFFF"/>
      </Button>
    </div>
  )
}
  