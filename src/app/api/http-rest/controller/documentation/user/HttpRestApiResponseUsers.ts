import { ApiProperty } from '@nestjs/swagger';
import { HttpRestApiResponse } from '@app/api/http-rest/controller/documentation/common/HttpRestApiResponse';
import { HttpRestApiModelUsers } from '@app/api/http-rest/controller/documentation/user/HttpRestApiModelUser';

export class HttpRestApiResponseUsers extends HttpRestApiResponse {
  @ApiProperty({ type: HttpRestApiModelUsers })
  public data: HttpRestApiModelUsers;
}
