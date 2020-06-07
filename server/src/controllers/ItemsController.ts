import { Request, Response } from "express";
import knex from "../database/connection";
import { myIP } from "../server";

export default class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://${myIP}:3333/uploads/${item.image}`,
    }));

    return response.json(serializedItems);
  }
}

// index, show, create, update, delete
