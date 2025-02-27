import { ApiProperty } from '@nestjs/swagger';
import { HttpRestApiResponse } from '@app/api/http-rest/controller/documentation/common/HttpRestApiResponse';
import { HttpRestApiModelUser } from '@app/api/http-rest/controller/documentation/user/HttpRestApiModelUser';

export class HttpRestApiResponseUser extends HttpRestApiResponse {
  @ApiProperty()
  public data: HttpRestApiModelUser;
}
