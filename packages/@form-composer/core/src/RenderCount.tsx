import React from "react";

export const RenderCount = () => {
    const renders = React.useRef(0)
    const styles = {
        position: 'absolute',
        top: '0',
        right: '0',
        fontStyle: 'normal',
        textAlign: 'center',
        height: '30px',
        width: '30px',
        lineHeight: '30px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        background: '#eee'
    }

    return (
        // @ts-ignore
        <span style={styles}>
            {++renders.current}
        </span>
    )
}
