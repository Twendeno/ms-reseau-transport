import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from "@nestjs/terminus";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService
  ) {
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck("Basic check", "http://localhost:3000/coordinates"),
      () => this.prismaHealth.pingCheck("prisma",this.prisma)
    ]);
  }
}
