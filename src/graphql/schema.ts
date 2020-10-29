import { asNexusMethod } from '@nexus/schema'
// import { objectType, queryType, mutationType } from 'nexus-plugin-prisma'
import { objectType, queryType, mutationType } from '@nexus/schema'
import { GraphQLDate } from 'graphql-iso-date'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.qty()
    t.model.type()
    t.model.description()
    t.model.serialNo()
    t.model.purchase_price()
    t.model.currency()
    t.model.inventarNr()
    t.model.kontoNr()
    t.model.date_added()
    t.model.date_updated()
    t.model.updated_by()
    t.model.ahk_date()
    t.model.ahk_wj_ende()
    t.model.buchw_wj_ende()
    t.model.n_afa_wj_ende()
    t.model.sonder_abs_wj_ende()
    t.model.nutzungsdauer()
    t.model.afa_art()
    t.model.afa_percent()
    t.model.kost1()
    t.model.kost2()
    t.model.filiale()
    t.model.lieferantNr()
    t.model.anlag_lieferant()
    t.model.ahk_wj_beginn()
    t.model.buchwert_wj_beginn()
    t.model.n_afa_wj_beginn()
    t.model.sonder_abs_wj_beginn()
    t.model.sonder_abs_art()
    t.model.sonder_abs_percent()
    t.model.restbeguenstigung()
    t.model.sonder_abs_verteil()
    t.model.abgang()
    t.model.lebenslaufakte()
    t.model.bestelldatum()
    t.model.erl_afa_art()
    t.model.herkunftsart()
    t.model.wkn_isin()
    t.model.erfassungsart()
    t.model.note()
    t.model.images()
    t.model.location()
    t.model.locationId()
    t.model.status()
    t.model.statusId()
    t.model.company()
    t.model.companyId()
    t.field('total', {
      type: 'Int',
      resolve: async (parent, args, ctx) => {
        let count = await ctx.db.item.count()
        return count
      },
    })
  },
})

export const Company = objectType({
  name: 'Company',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.logoUrl()
    t.model.description()
    t.model.email()
    t.model.note()
    t.model.item()
  },
})
export const Warehouse = objectType({
  name: 'Warehouse',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.street1()
    t.model.street2()
    t.model.city()
    t.model.zip()
    t.model.country()
    t.model.location()
  },
})
export const Image = objectType({
  name: 'Image',
  definition(t) {
    t.model.id()
    t.model.url()
    t.model.title()
    t.model.item()
  },
})

export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.model.id()
    t.model.description()
    t.model.parent()
    t.model.warehouse()
    t.model.warehouseId()
    t.model.item()
    t.field('total', {
      type: 'Int',
      resolve: async (parent, args, ctx) => {
        let count = await ctx.db.location.count()
        return count
      },
    })
  },
})

export const Status = objectType({
  name: 'Status',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.item()
  },
})

export const Shipment = objectType({
  name: 'Shipment',
  definition(t) {
    t.model.id()
    t.model.direction()
    t.model.provider()
    t.model.trackingNr()
    t.model.date_added()
    t.model.date_updated()
    t.model.updated_by()
    t.model.arrived()
    t.field('total', {
      type: 'Int',
      resolve: async (parent, args, ctx) => {
        let count = await ctx.db.shipment.count()
        return count
      },
    })
  },
})

export const Mutations = queryType({
  definition(t) {
    t.list.field('allItems', {
      type: 'Item',
      resolve(_parent, _args, ctx) {
        return ctx.db.item.findMany({})
      },
    })

    t.crud.item()
    t.crud.items({ filtering: true, ordering: true })
    t.list.field('allCompanies', {
      type: 'Company',
      resolve(_parent, _args, ctx) {
        return ctx.db.company.findMany({})
      },
    })

    t.crud.company()
    t.crud.companies({ filtering: true, ordering: true })
    t.list.field('allWarehouses', {
      type: 'Warehouse',
      resolve(_parent, _args, ctx) {
        return ctx.db.warehouse.findMany({})
      },
    })

    t.crud.warehouse()
    t.crud.warehouses({ filtering: true, ordering: true })
    t.list.field('allImages', {
      type: 'Image',
      resolve(_parent, _args, ctx) {
        return ctx.db.image.findMany({})
      },
    })

    t.crud.image()
    t.crud.images({ filtering: true, ordering: true })
    t.list.field('allLocations', {
      type: 'Location',
      resolve(_parent, _args, ctx) {
        return ctx.db.location.findMany({})
      },
    })

    t.crud.location()
    t.crud.locations({ filtering: true, ordering: true })
    t.list.field('allStatuses', {
      type: 'Status',
      resolve(_parent, _args, ctx) {
        return ctx.db.status.findMany({})
      },
    })

    t.crud.status()
    t.crud.statuses({ filtering: true, ordering: true })
    t.list.field('allStatuses', {
      type: 'Status',
      resolve(_parent, _args, ctx) {
        return ctx.db.status.findMany()
      },
    })

    t.crud.shipment()
    t.crud.shipments({ filtering: true, ordering: true })
    t.list.field('allShipments', {
      type: 'Shipment',
      resolve(_parent, _args, ctx) {
        return ctx.db.shipment.findMany({})
      },
    })
  },
})

export const Crud = mutationType({
  definition(t) {
    t.field('deleteItems', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.item.deleteMany({})
        return `${count} items(s) deleted.`
      },
    })

    t.crud.createOneItem()
    t.crud.deleteOneItem()
    t.crud.deleteManyItem()
    t.crud.updateOneItem()
    t.crud.updateManyItem()
    t.field('deleteCompanies', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.company.deleteMany({})
        return `${count} company(s) deleted.`
      },
    })

    t.crud.createOneCompany()
    t.crud.deleteOneCompany()
    t.crud.deleteManyCompany()
    t.crud.updateOneCompany()
    t.crud.updateManyCompany()
    t.field('deleteWarehouses', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.warehouse.deleteMany({})
        return `${count} warehouse(s) deleted.`
      },
    })

    t.crud.createOneWarehouse()
    t.crud.deleteOneWarehouse()
    t.crud.deleteManyWarehouse()
    t.crud.updateOneWarehouse()
    t.crud.updateManyWarehouse()
    t.field('deleteImages', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.image.deleteMany({})
        return `${count} image(s) deleted.`
      },
    })

    t.crud.createOneImage()
    t.crud.deleteOneImage()
    t.crud.deleteManyImage()
    t.crud.updateOneImage()
    t.crud.updateManyImage()
    t.field('deleteLocations', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.location.deleteMany({})
        return `${count} location(s) deleted.`
      },
    })

    t.crud.createOneLocation()
    t.crud.deleteOneLocation()
    t.crud.deleteManyLocation()
    t.crud.updateOneLocation()
    t.crud.updateManyLocation()
    t.field('deleteStatuses', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.status.deleteMany({})
        return `${count} status(es) deleted.`
      },
    })

    t.crud.createOneStatus()
    t.crud.deleteOneStatus()
    t.crud.deleteManyStatus()
    t.crud.updateOneStatus()
    t.crud.updateManyStatus()
    t.field('deleteShipments', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.shipment.deleteMany({})
        return `${count} shipment(s) deleted.`
      },
    })

    t.crud.createOneShipment()
    t.crud.deleteOneShipment()
    t.crud.deleteManyShipment()
    t.crud.updateOneShipment()
    t.crud.updateManyShipment()
  },
})
