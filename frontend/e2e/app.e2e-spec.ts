import { Ase16Page } from './app.po';

describe('ase16 App', function() {
  let page: Ase16Page;

  beforeEach(() => {
    page = new Ase16Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(' works!');
  });
});
