import { Field as ChakraField } from "@chakra-ui/react"
import * as React from "react"

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props
    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <>
            {/* TODO: Remove @ts-ignore when @chakra-ui/react fixes Field.Label children prop types in future version */}
            {/* @ts-ignore */}
            <ChakraField.Label>
              {label}
              <ChakraField.RequiredIndicator fallback={optionalText} />
            </ChakraField.Label>
          </>
        )}
        {children}
        {helperText && (
          <>
            {/* TODO: Remove @ts-ignore when @chakra-ui/react fixes Field.HelperText children prop types in future version */}
            {/* @ts-ignore */}
            <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
          </>
        )}
        {errorText && (
          <>
            {/* TODO: Remove @ts-ignore when @chakra-ui/react fixes Field.ErrorText children prop types in future version */}
            {/* @ts-ignore */}
            <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
          </>
        )}
      </ChakraField.Root>
    )
  },
)
