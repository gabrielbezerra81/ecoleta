import knex from "knex";
import path from "path";

//TODO: integração com banco NoSQL

const connection = knex({
  client: "sqlite3",
  connection: { filename: path.resolve(__dirname, "database.sqlite") },
  useNullAsDefault: true,
});

export default connection;

/*
    Tabelas do DB

        * points (Pontos de coleta)
            * image
            * name
            * email
            * whatsapp
            * latitude
            * longitude
            * city
            * uf

        * items (Itens coletados)
            * image
            * title
            
        * point_items (Relacionamento dos itens que um ponto coleta) => tabela pivot
            * point_id 
            * item_id

        - Relação de Muitos para Muitos (N - N)
*/

/*
    Migration => Histórico do banco de dados



*/
