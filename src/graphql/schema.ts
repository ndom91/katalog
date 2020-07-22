import { schema, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(prisma({ features: { crud: true } }))

schema.objectType({
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
    t.model.images()
    t.model.location()
    t.model.locationId()
    t.model.status()
    t.model.statusId()
  },
})

schema.objectType({
  name: 'Image',
  definition(t) {
    t.model.id()
    t.model.url()
    t.model.title()
    t.model.item()
  },
})

schema.objectType({
  name: 'Location',
  definition(t) {
    t.model.id()
    t.model.description()
    t.field('total', {
      type: 'Int',
      resolve: async (parent, args, ctx) => {
        let count = await ctx.db.location.count()
        return count
      },
    })
  },
})

schema.objectType({
  name: 'Status',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.color()
    t.model.item()
  },
})

schema.queryType({
  definition(t) {
    t.list.field('allItems', {
      type: 'Item',
      resolve(_parent, _args, ctx) {
        return ctx.db.item.findMany({})
      },
    })
    t.crud.item()
    t.crud.items({ filtering: true, ordering: true })
    t.list.field('allImages', {
      type: 'Image',
      resolve(_parent, _args, ctx) {
        return ctx.db.image.findMany({})
      },
    })
    t.crud.image()
    t.crud.images()
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
  },
})

schema.mutationType({
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
    t.field('deleteImages', {
      type: 'String',
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.item.deleteMany({})
        return `${count} images(s) deleted.`
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
        const { count } = await ctx.db.item.deleteMany({})
        return `${count} locations(s) deleted.`
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
        const { count } = await ctx.db.item.deleteMany({})
        return `${count} locations(s) deleted.`
      },
    })

    t.crud.createOneStatus()
    t.crud.deleteOneStatus()
    t.crud.deleteManyStatus()
    t.crud.updateOneStatus()
    t.crud.updateManyStatus()
  },
})
