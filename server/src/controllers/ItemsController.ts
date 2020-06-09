import { Request, Response } from "express";
import knex from "../database/connection";
import { serverURL, chosenDB, mongoDB } from "../server";
import { findDocuments } from "../mongoDB/database";

export default class ItemsController {
  async index(request: Request, response: Response) {
    if (chosenDB === mongoDB) {
      findDocuments("items", (items) => {
        const serializedItems = items.map((item) => ({
          id: item._id,
          title: item.title,
          image_url: `${serverURL}/uploads/${item.image}`,
        }));

        return response.json(serializedItems);
      });
    } else {
      const items = await knex("items").select("*");

      const serializedItems = items.map((item) => ({
        id: item.id,
        title: item.title,
        image_url: `${serverURL}/uploads/${item.image}`,
      }));

      return response.json(serializedItems);
    }
  }
}

// index, show, create, update, delete
