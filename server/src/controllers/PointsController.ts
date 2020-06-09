import { Request, Response } from "express";
import knex from "../database/connection";
import { serverURL, chosenDB, mongoDB } from "../server";
import { insertDocuments, findDocuments } from "../mongoDB/database";
import { ObjectId } from "mongodb";

export default class PointsController {
  async index(request: Request, response: Response) {
    let { city, uf, items } = request.query;
    city = String(city);
    uf = String(uf);

    const ItemIDList = String(items).split(",");

    if (chosenDB === mongoDB)
      findDocuments(
        "points",
        (pointsCollection) => {
          const filteredPointsByID = pointsCollection.filter((point) => {
            const itemListHasID = point.items.some((item: { _id: ObjectId }) =>
              ItemIDList.includes(new ObjectId(item._id).toHexString())
            );
            return itemListHasID;
          });

          const points = filteredPointsByID.map((point) => ({
            ...point,
            id: point._id,
            image_url: `${serverURL}/uploads/${point.image}`,
          }));

          return response.json(points);
        },
        { uf: uf, city: city }
      );
    else {
      const parsedItems = String(items)
        .split(",")
        .map((item) => Number(item.trim()));

      const filteredPoints = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parsedItems)
        .where("city", city)
        .where("uf", uf)
        .distinct()
        .select("points.*");

      const serializedPoints = filteredPoints.map((point) => ({
        ...point,
        image_url: `${serverURL}/uploads/${point.image}`,
      }));

      return response.json(serializedPoints);
    }
  }

  // Image => serialização e API transform

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if (chosenDB === mongoDB) {
      if (!ObjectId.isValid(id)) {
        return response.status(400).json({ message: "Point not found." });
      }

      const objID = new ObjectId(id);

      findDocuments(
        "points",
        (docs) => {
          if (!docs.length)
            return response.status(400).json({ message: "Point not found." });

          const point = docs[0];

          const serializedPoint = {
            ...point,
            id: point._id,
            image_url: `${serverURL}/uploads/${point.image}`,
          };

          return response.json({ point: serializedPoint });
        },
        { _id: objID }
      );
    } else {
      const point = await knex("points").where("id", id).first();

      /*
    Seleciona os elementos em que o point_id de point_items for igual ao id do ponto que está sendo buscado. O join retorna
    elementos que são a junção de atributos das duas tabelas {id, image, title} + {point_id, item_id} onde o id do item for
    igual ao item_id (os itens que possuem coleta, de forma repetida, pois mostra de todos os pontos cadastrados)
     */
      const items = await knex("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)
        .select("items.title");

      // const points_items = await knex("point_items").where("point_id", id);
      // const itemsIds = points_items.map((point_item) => point_item.item_id);
      // const items = await knex("items")
      //   .whereIn("id", itemsIds)
      //   .select("items.title");

      const serializedPoint = {
        ...point,
        image_url: `${serverURL}/uploads/${point.image}`,
      };

      return response.json({ point: serializedPoint, items });
    }
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    if (chosenDB === mongoDB) {
      const itemIDs = items.split(",").map((id: string) => new ObjectId(id));

      findDocuments(
        "items",
        (itemsCollection) => {
          const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items: itemsCollection,
          };

          insertDocuments("points", [point], (result) => {
            return response.json(result.ops[0]);
          });
        },
        { _id: { $in: itemIDs } }
      );
    } else {
      const trx = await knex.transaction();

      const point = {
        image: request.file.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      };

      const insertedIds = await trx("points").insert(point);

      const point_id = insertedIds[0];

      const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => ({
          item_id,
          point_id,
        }));

      await trx("point_items").insert(pointItems);

      await trx.commit();

      return response.json({ id: point_id, ...point });
    }
  }
}
