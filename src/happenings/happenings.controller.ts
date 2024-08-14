import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HappeningsService } from './happenings.service';
import { CreateHappeningDto } from './dto/create-happening.dto';
import { UpdateHappeningDto } from './dto/update-happening.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('happenings')
@Controller('happenings')
export class HappeningsController {
  constructor(private readonly happeningsService: HappeningsService) {}

  @Post()
  create(@Body() createHappeningDto: CreateHappeningDto) {
    return this.happeningsService.create(createHappeningDto);
  }

  @Get()
  findAll() {
    return this.happeningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.happeningsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHappeningDto: UpdateHappeningDto) {
    return this.happeningsService.update(id, updateHappeningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.happeningsService.remove(id);
  }
}
