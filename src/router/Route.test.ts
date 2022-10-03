import { expect } from 'chai';
import { SignIn } from '../pages/signIn';
import { Route } from './Route';

describe('Route class test', () => {
  const route = new Route('/', SignIn, '#app');

  it('Instance create', () => {
    expect(route).to.be.an.instanceof(Route);
  });
});
