

// Prevents bad input and Protects DB
export const validate = (schema) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation Failed",
            errors: error.errors,
        })
    }
}