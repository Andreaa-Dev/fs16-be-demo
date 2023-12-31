import request from "supertest";

import app from "../../app";
import CategoryService from "../../services/categoryService";
import connect, { MongoHelper } from "../db-helper";
import CategoryRepo from "../../models/Category";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new category", async () => {
    // create new category
    const category = {
      name: "test",
    };
    const newCategory = await CategoryService.createOne(category);
    expect(newCategory).toHaveProperty("_id");
    expect(newCategory.name).toEqual("test");
  });

  it("should return a list", async () => {
    // create new category
    const newCategory = new CategoryRepo({
      name: "test",
    });

    await newCategory.save();

    // way1: use createOne()
    // way2: save()

    const categories = await CategoryService.findAll();
    expect(categories.length).toEqual(1);
    // check length
  });
});
