import { AppDataSource } from "@db";
import { Donation, Subscription } from '@models';
import { generateNextPaymentDates, isSameDate } from "@services/helpers/dates";
import { GraphQLError } from "graphql";
import cloneDeep from 'lodash.clonedeep';

class SubscriptionService {
    public static async getSubscription(userId: number, subscriptionId: number): Promise<Subscription> {
        if((userId===null || userId=== undefined) || (subscriptionId===null || subscriptionId=== undefined)) return null;

        const subscriptionRepository = AppDataSource.getRepository(Subscription)
        const subscription = await subscriptionRepository.find({where: {id: subscriptionId, user: {id: userId}}, relations: {user: true, paymentMethod: true, donations: true}});
        return subscription[0] || null;
    }

    public static async getSubscriptions(userId: number): Promise<Subscription[]> {
        if(userId===null || userId=== undefined) return [];

        const subscriptionRepository = AppDataSource.getRepository(Subscription)
        const subscriptions = await subscriptionRepository.find({where: {user: {id: userId}}, relations: {user: true, paymentMethod: true, donations: true}});
        return subscriptions;
    }

    public static async chargeSubscription(subscription): Promise<Subscription>{
        //lookup subscription and validate it belongs to the provided user
        const subscriptionRepository = AppDataSource.getRepository(Subscription)
        const foundSubscription = await subscriptionRepository.findOne({
            where: {
                id: subscription.subscriptionId,
                user: {id: subscription.userId} 
            },
            relations: {donations: true, user: true, paymentMethod: true}
        });

        if(!foundSubscription) throw new Error(`The specified subscription was not found`);
        
        //validate that there hasn't been a payment on the same date
        const donationSameDate = foundSubscription.donations.filter(d => {return isSameDate(d.paymentDate, subscription.paymentDate)===true});
        if(donationSameDate.length > 0) throw new Error(`There is already a donation charged on the day ${subscription.paymentDate}`);

        //subscription found, charge the requested amount to the payment method
        const donation = new Donation();
        donation.user = foundSubscription.user;
        donation.subscription = cloneDeep(foundSubscription);
        donation.paymentMethod = foundSubscription.paymentMethod;
        donation.amount = foundSubscription.amount;
        donation.paymentDate = subscription.paymentDate;
       
        try {
            await AppDataSource.manager.save(donation)
            foundSubscription.donations.push(donation);
            return foundSubscription;
        } catch (error) {
            throw new error;
        }
    }

    public static async updateSubscription(subscription): Promise<Subscription> {
        const subscriptionRepository = AppDataSource.getRepository(Subscription)
        const foundSubscription = await subscriptionRepository.findOne({
            where: {
                id: subscription.subscriptionId,
                user: {id: subscription.userId} 
            },
            relations: {donations: true, user: true, paymentMethod: true}
        });

        if(!foundSubscription) throw new Error(`The specified subscription was not found`);

        const donation = new Donation();
        const today = new Date();
        const dateChanged = isSameDate(foundSubscription.nextPaymentDate, subscription.nextPaymentDate);
        const hasDonationsToday = foundSubscription.donations.filter(d => {return isSameDate(d.paymentDate, today)===true}).length > 0;

        //validate if the date was changed to today's date
        if(dateChanged) {
            // check if there's a donation already processed today, otherwise charge a new donation
            if(!hasDonationsToday) {
                // there's no donation charged today.  Add the donation
                donation.user = foundSubscription.user;
                donation.subscription = cloneDeep(foundSubscription);
                donation.paymentMethod = foundSubscription.paymentMethod;
                donation.amount = foundSubscription.amount;
                donation.paymentDate = subscription.nextPaymentDate;
            }
        }

        //update the subscription values
        try {
            foundSubscription.amount = subscription.amount;
            foundSubscription.interval = subscription.interval;
            foundSubscription.nextPaymentDate = generateNextPaymentDates(subscription.nextPaymentDate, foundSubscription.interval)[0];

            if(dateChanged && !hasDonationsToday) {
                await AppDataSource.manager.save(donation)
                foundSubscription.donations.push(donation);
            }

            await AppDataSource.manager.save(foundSubscription);
        } catch (error) {
            throw new Error(error);
        }

        return foundSubscription;
    }
}

export default SubscriptionService;