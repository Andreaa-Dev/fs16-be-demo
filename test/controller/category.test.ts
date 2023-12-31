import request from "supertest";

import app from "../../app";
import CategoryService from "../../services/categoryService";
import connect, { MongoHelper } from "../db-helper";

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

  it("Should create a category", async () => {
    // const document = await CategoryService.createOne({ name: "new cat" });
    // console.log("document:", document);
    // expect(document).toHaveProperty("name");

    const response = await request(app).post("/api/v1/categories").send({
      name: "Test cat",
    });
    expect(response.body.category).toHaveProperty("name");
    expect(response.body).toMatchObject({ category: { name: "Test cat" } });
    expect(response.body).toEqual({
      category: {
        name: "Test cat",
        __v: expect.any(Number),
        _id: expect.any(String),
      },
    });
  });

  // it("should not create new category");

  // find all category
  it("should return all category", async () => {
    // create a category
    try {
      await CategoryService.createOne({ name: "category1" });
    } catch (error) {
      console.log(error);
    }

    const response = await request(app).get("/api/v1/categories");

    expect(response.body.categories.length).toEqual(0);
    expect(response.body.categories[0]).toMatchObject({
      name: "category1",
    });
  });
});
