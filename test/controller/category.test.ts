import request from "supertest"

import app from "../../"
import CategoryService from "../../services/categoryService"
import connect, { MongoHelper } from "../db-helper"

describe("Category controller", () => {
  let mongoHelper: MongoHelper

  beforeAll(async () => {
    mongoHelper = await connect()
  })

  afterEach(async () => {
    await mongoHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongoHelper.closeDatabase()
  })

  it("Should create a category", async () => {
    const document = await CategoryService.createOne({ name: "new cat" })
    console.log("document:", document)
    const response = await request(app).post("/api/v1/categories").send({
      name: "Test cat",
    })

    expect(document).toHaveProperty("name")
  })
})
