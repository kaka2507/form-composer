export const parseText = (value?: string) => value || ''
export const parseNumber = (value?: string) => value && +value

export const mapInputProps = ({ onChange, ...props }) => ({
    ...props,
    onChange: v => {
        onChange(v.target.value)
    }
})
