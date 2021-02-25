
import { _throw } from 'rxjs/observable/throw'
import { Observable } from 'rxjs';
import { Response } from '@angular/http';

export class ErrorHandler {
  static handleError(erro: Response | any) {
    let errorMessage: string;

    if (erro instanceof Response) {
       errorMessage = `Erro ${erro.status} ao acessar a URL ${erro.url} - ${erro.statusText}`;
    } else {
      errorMessage = erro.toString();
    }

    console.log(errorMessage);
    return _throw(errorMessage);

  }
}