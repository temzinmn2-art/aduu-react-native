import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Азарганы мэдээллийн хүснэгт
export const AzargaTable = sqliteTable('azarga', {
  id: integer('id').primaryKey({autoIncrement: true}),
  ner: text('ner').notNull(),
  image: text('image'),
})


// Адууны мэдээллийн хүснэгт
export const AduuTable = sqliteTable('aduu', {
  id: integer('id').primaryKey({ autoIncrement: true }), 
  ner: text('ner').notNull(),                            
  zus: text('zus').notNull(),                            
  nas: text('nas').notNull(),  
  nasniitoo: integer('nasniitoo'),                                    
  tailbar: text('tailbar'),    
  ezen: text('ezen').notNull(),  
  azargaId: integer('azarga_id').references(() => azargaTable.id),                     
});

//Адууны зургийн мэдээллийг хадгалах хүснэгт
export const AduuImageTable = sqliteTable('aduu_image', {
  id: integer('id').primaryKey({autoIncrement: true}),
  aduuId: integer('aduu_id').references(() => aduuTable.id),
  imagePath: text('image').notNull(),
})