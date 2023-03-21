import { AppDataSource } from "@db";
import { Donation } from '@models';

class DonationService {
    public static async getDonations(): Promise<Donation[]> {
        const donationRepository = AppDataSource.getRepository(Donation)
        const donations = await donationRepository.find();
        console.log('donations: ', donations);
        return donations;
    }
}

export default DonationService;