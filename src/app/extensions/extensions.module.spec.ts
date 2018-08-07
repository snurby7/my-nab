import { ExtensionsModule } from './extensions.module';

describe('ExtensionsModule', () => {
  let extensionsModule: ExtensionsModule;

  beforeEach(() => {
    extensionsModule = new ExtensionsModule();
  });

  it('should create an instance', () => {
    expect(extensionsModule).toBeTruthy();
  });
});
