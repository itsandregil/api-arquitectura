import request from "supertest";
import app from "../../src/app";
import config from "../../src/core/config";
import { client } from "../../src/core/redis";

jest.mock("../../src/core/redis");
global.fetch = jest.fn();

describe("GET /api/", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Returns mocked data from Agify API when not cached", async () => {
    (client.get as jest.Mock).mockResolvedValue(null);

    const mockAgifyResponse = {
      name: "Lusy Oregon",
      age: 61,
      count: 183018,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockAgifyResponse,
    });

    (client.setEx as jest.Mock).mockResolvedValue("OK");

    const res = await request(app).get("/api?name=Lusy%20Oregon");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: mockAgifyResponse });

    expect(client.get).toHaveBeenCalledWith("Lusy Oregon");
    expect(client.setEx).toHaveBeenCalledWith(
      "Lusy Oregon",
      config.cacheExpirationTime,
      JSON.stringify(mockAgifyResponse)
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.agify.io?name=Lusy Oregon"
    );
  });

  it("Returns data from Redis cache when available", async () => {
    const cachedData = {
      name: "Lusy Oregon",
      age: 61,
      count: 183018,
    };

    (client.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedData));

    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockClear();

    const res = await request(app).get("/api?name=Lusy%20Oregon");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: cachedData });

    expect(fetchMock).not.toHaveBeenCalled();

    expect(client.get).toHaveBeenCalledWith("Lusy Oregon");
  });
});
