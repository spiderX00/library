import { Injectable, InjectionToken } from '@angular/core';
import { Faker, faker } from '@faker-js/faker';
import { FakeGenerator } from './faker.interface';

@Injectable({
  providedIn: 'root',
})
export class MockdataServiceService implements FakeGenerator {
  public readonly faker: Faker = faker;
}

export const FAKE_DATA_GENERATOR = new InjectionToken<Faker>('fakeDataGenerator');

export function fakerjs(): Faker {
  return new MockdataServiceService().faker;
}
