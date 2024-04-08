import { Faker } from "@faker-js/faker";

export interface FakeGenerator {
    readonly faker: Faker;
}