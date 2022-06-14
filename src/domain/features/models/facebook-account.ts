type FacebookData = {
  name: string
  email: string, 
  facebookId: string 
}

type AccountData = {
  name?: string
  id?: string 
 
 }
export class FacebookAccount {
  id?: string // colocamos o ? quando pode ou não ter o campo.
  name: string // Agora vou criar o teste desse experimento que fiz
  email: string //perante ao tdd, o ideial seria ter feito o teste primeiro
  facebookId: string// para não esquecermos de fazer o teste depois.

  constructor(fbData: FacebookData, accountData?: AccountData){ 
    this.id = accountData?.id //verificando se existe ou não
    this.name = accountData?.name ?? fbData.name
    this.email = fbData.email
    this.facebookId = fbData.facebookId
 }
}
//ficou mais limpo nosso serviço porque movemos a regra de negócio
//para um enttidade de domínio.
