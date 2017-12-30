import { KLHomePage } from './app.po';

describe('klhome App', () => {
  let page: KLHomePage;

  beforeEach(() => {
    page = new KLHomePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
