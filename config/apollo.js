import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"; // Apollo Client 3.0
//import fetch from "node-fetch"; // Para usar fetch en Node.js
import { setContext } from "apollo-link-context"; // Para añadir el token a las cabeceras de las peticiones

const httpLink = createHttpLink({ // Crear el enlace de conexión
    uri: "https://crm-graphql-backend.onrender.com", // URL de la API
    //fetch
});

const authLink = setContext((_, { headers }) => { // Crear el enlace de autenticación
    // Leer el storage almacenado
    const token = localStorage.getItem("token"); // Leer el token del storage
    
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;