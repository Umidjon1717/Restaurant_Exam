import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { UserAddressModule } from './user_address/user_address.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { MenuCategoryModule } from './menu_category/menu_category.module';
import { OrderModule } from './order/order.module';
import { OrderMenuModule } from './order_menu/order_menu.module';
import { PaymentModule } from './payment/payment.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReviewModule } from './review/review.module';
import { HappeningsModule } from './happenings/happenings.module';
import { EmployeeModule } from './employee/employee.module';
import { RoleModule } from './role/role.module';
import { ShiftModule } from './shift/shift.module';
import { FileModule } from './file/file.module';


@Module({
  imports: [FileModule, UserModule, ContactModule, AddressModule, UserAddressModule, CategoryModule, MenuModule, MenuCategoryModule, OrderModule, OrderMenuModule, PaymentModule, ReservationsModule, ReviewModule, HappeningsModule, EmployeeModule, RoleModule, ShiftModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
