import { buildLogger, logger, logger as winstonLogger } from '../../src/plugins/logger.plugin';

describe('plugins/logger.plugin', () => {

  // Verificar que sean una funcion.
  test('buildLogger() should return a funtion logger', () => {

    const logger = buildLogger('test');

    expect(typeof logger.log).toBe('function');
    expect(typeof logger.error).toBe('function');

  });

  //Verficar que se lleme el logger.log
  test('logger.log should log a message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger, 'log'); 
    const message = 'test message';
    const service = 'test service';
    const logger = buildLogger(service);

    logger.log(message)

    expect(winstonLoggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({
        level: "info",
        message,
        service,
      })
    );
  });




});

