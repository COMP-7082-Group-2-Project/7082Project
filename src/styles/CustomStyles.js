export const CustomStyles = {
    control: (styles) => ({
        ...styles,
        width: "100%",
        // maxWidth: "14rem",
        minWidth: "12rem",
        borderRadius: "5px",
        color: "#000",
        fontSize: "0.8rem",
        lineHeight: "1.75rem",
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
        border: "2px solid #000000",
        boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
        ":hover": {
            border: "2px solid #000000",
            boxShadow: "none",
        },
    }),
    option: (styles, { isDisabled }) => {
        return {
            ...styles,
            color: isDisabled ? "green" : "#000",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            width: "100%",
            background: "#fff",
            ":hover": {
                backgroundColor: "rgb(243 244 246)",
                color: !isDisabled && "#000",
                cursor: !isDisabled && "pointer",
            },
        };
    },
    menu: (styles) => {
        return {
            ...styles,
            backgroundColor: "#fff",
            maxWidth: "14rem",
            border: "2px solid #000000",
            borderRadius: "5px",
            boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
        };
    },

    placeholder: (defaultStyles, { isDisabled }) => {
        return {
            ...defaultStyles,
            color: isDisabled ? "grey" : "#000",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
        };
    },
};