import { Checkbox as ChakraCheckbox } from "@chakra-ui/react"
import * as React from "react"

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.Ref<HTMLLabelElement>
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props
    return (
      <ChakraCheckbox.Root ref={rootRef} {...rest}>
        <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
        {/* TODO: Remove @ts-ignore when @chakra-ui/react fixes Checkbox.Control children prop types in future version */}
        {/* @ts-ignore */}
        <ChakraCheckbox.Control>
          {icon || <ChakraCheckbox.Indicator />}
        </ChakraCheckbox.Control>
        {children != null && (
          <>
            {/* TODO: Remove @ts-ignore when @chakra-ui/react fixes Checkbox.Label children prop types in future version */}
            {/* @ts-ignore */}
            <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
          </>
        )}
      </ChakraCheckbox.Root>
    )
  },
)
