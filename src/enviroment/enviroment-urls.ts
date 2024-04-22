export const enviromentUrls = {
    company: {
        create: `/create-company`,
        update: (id: number) => `/update-company/${id}`,
        getList: `/companies`,
        delete: (id: number) => `/delete-company/${id}`
    },
    employee: {
        create: `/create-employee`,
        update: (id: number) => `/update-employee/${id}`,
        getList: `/employees`,
        delete: (id: number) => `/delete-employee/${id}`
    },
    login: {
        loginauth: `/loginauth`,
        logout: `/logout`,
    }
};