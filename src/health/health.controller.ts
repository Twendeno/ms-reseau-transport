import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus";
import { ApiTags } from "@nestjs/swagger";

@Controller("health")
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck("Basic check", "http://localhost:3000/api-docs")
    ]);
  }
}
