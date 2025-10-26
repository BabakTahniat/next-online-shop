import {
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    boolean,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';
import { AdapterAccountType } from 'next-auth/adapters';

export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    passwordHash: text('password_hash').notNull(),
    emailVerified: timestamp('email_verified', {
        mode: 'date',
        withTimezone: true,
    }),
    image: text('image').default('/default_pfp.svg').notNull(),
    twoFactorEnabled: boolean('two_factor_enabled').default(false),
    role: userRoleEnum('role').notNull().default('user'),
    active: boolean('active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const accounts = pgTable(
    'account',
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccountType>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('provider_account_id').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ],
);

export const sessions = pgTable('session', {
    sessionToken: text('session_token').primaryKey(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', {
        mode: 'date',
        withTimezone: true,
    }).notNull(),
});

export const verificationTokens = pgTable('verification_token', {
    email: text('email')
        .notNull()
        .unique()
        .references(() => users.email, { onDelete: 'cascade' }),
    token: text('token').notNull(),
    expires: timestamp('expires', {
        mode: 'date',
        withTimezone: true,
    }).notNull(),
});
